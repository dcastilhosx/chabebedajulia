
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const Participant = () => {
  const [name, setName] = useState("");
  const [companion, setCompanion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira seu nome para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('participants')
        .insert([{ name: name.trim(), companion: companion.trim() }])
        .select()
        .single();

      if (error) throw error;

      // Salvar ID do participante para uso posterior
      localStorage.setItem("participant_id", data.id);
      navigate("/gifts");
    } catch (error) {
      toast({
        title: "Erro ao salvar participante",
        description: "Ocorreu um erro ao salvar seus dados. Tente novamente.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-6 backdrop-blur-lg bg-white/80 shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Confirme sua presença
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu nome *
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="Digite seu nome"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do acompanhante (opcional)
              </label>
              <Input
                type="text"
                value={companion}
                onChange={(e) => setCompanion(e.target.value)}
                className="w-full"
                placeholder="Digite o nome do acompanhante"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Escolher Presente"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Participant;
