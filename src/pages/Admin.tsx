
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface GiftData {
  id: string;
  gift: string;
  participant: {
    name: string;
    companion: string | null;
  };
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [giftsList, setGiftsList] = useState<GiftData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchGiftsList();
      subscribeToChanges();
    }
  }, [isAuthenticated]);

  const fetchGiftsList = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('chosen_gifts')
        .select(`
          id,
          gift,
          participant:participants (
            name,
            companion
          )
        `);

      if (error) throw error;

      setGiftsList(data || []);
    } catch (error) {
      console.error('Erro ao buscar presentes:', error);
      toast({
        title: "Erro ao carregar lista",
        description: "Ocorreu um erro ao carregar a lista de presentes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const gifts = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chosen_gifts' },
        () => {
          fetchGiftsList();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gifts);
    };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <Card className="p-6 backdrop-blur-lg bg-white/80 shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
              Área Administrativa
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              >
                Entrar
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-6 backdrop-blur-lg bg-white/80 shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Lista de Presentes Escolhidos
          </h2>
          {isLoading ? (
            <div className="text-center text-gray-500">Carregando...</div>
          ) : (
            <div className="space-y-4">
              {giftsList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <h3 className="font-medium text-gray-800">{item.gift}</h3>
                  <p className="text-gray-600">
                    Escolhido por: {item.participant.name}
                    {item.participant.companion && ` (+ ${item.participant.companion})`}
                  </p>
                </div>
              ))}
              {giftsList.length === 0 && (
                <p className="text-center text-gray-500">
                  Nenhum presente foi escolhido ainda.
                </p>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Admin;
