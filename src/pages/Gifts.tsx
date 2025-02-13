
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const gifts = [
  "Fraldas de pano + 01 pct de fralda (P, M ou G)",
  "Fraldas de  pano + 01 pct de fralda (P,M ou G)",
  "Fraldas de pano + 01 pct de  fralda (P, M ou G)",
  "Aspirador nasal + 01 pct de fralda (P, M ou G)",
  "Tesoura e lixa de unha para bebê + 01 pct de fralda (P, M ou G)",
  "Toalhas fralda + 01 pct de fralda (P,M ou G)",
  "Toalhas fralda + 01 pct de fralda (P, M ou G)",
  "Toalhas com capuz + 01 pct de fralda (P, M ou G)",
  "Toalhas com capuz + 01 pct de fralda (P, M ou G)",
  "Kit de escova e pente de cabelos para bebê + 01 pct de fralda (P, M ou G)",
  "Termômetro infravermelho (testa) + 01 pct de fralda (P, M ou G)",
  "Termômetro para banho + 01 pct de fralda (P, M ou G)",
  "Cueiros + 01 pct de fralda (P,M ou G)",
  "Cueiros + 01 pct de fralda (P, M ou G)",
  "Pratos e talheres de alimentação + 01 pct de fralda (P, M ou G)",
  "Babadores + 01 pct de fralda (P, M ou G)",
  "Chupeta com porta chupeta e prendedor + 01 pct de fralda (P,M ou G)",
  "Chupeta com porta chupeta e prendedor + 01 pct de fralda (P, M ou G)",
  "Sling / canguru + 01 pct de fralda (P, M ou G)",
  "Absorventes para seios + 01 pct de fralda (P, M ou G)",
  "Mamadeira fase 1 + 01 pct de fralda (P,M ou G)",
  "Mamadeira fase 1 + 01 pct de fralda (P, M ou G)",
  "Mamadeira fase 2 + 01 pct de fralda (P,M ou G)",
  "Mamadeira fase 2 + 01 pct de fralda (P, M ou G)",
  "Bodies manga comprida + 01 pct de fralda (P, M ou G)",
  "Bodies manga curta + 01 pct de fralda (P, M ou G)",
  "Calça culote \"mijão\" + 01 pct de fralda (P, M ou G)",
  "Bodies manga comprida + 01 pct de fralda (P,M ou G)",
  "Bodies manga curta + 01 pct de fralda (P, M ou G)",
  "Calça culote \"mijão\" + 01 pct de fralda (P, M ou G)",
  "Bodies manga comprida + 01 pct de fralda (P, M ou G)",
  "Bodies manga curta + 01 pct de fralda (P,M ou G)",
  "Calça culote \"mijão\" + 01 pct de fralda (P, M ou G)",
  "Bodies manga comprida + 01 pct de fralda (P,M  ou G)",
  "Bodies manga curta + 01 pct de fralda (P,M ou G)",
  "Calça culote \"mijão\" + 01 pct de fralda (P, M ou G)",
  "Casaquinho de algodão ou lã + 01 pct de fralda (P,M ou G)",
  "Casaquinho de algodão ou lã + 01 pct de fralda (P, M  ou G)",
  "Casaquinho de algodão ou lã + 01 pct de fralda (P, M ou G)",
  "Luvas sem dedos + 01 pct de fralda (P, M ou G)",
  "Chapéu para sol + 01 pct de fralda (P, M ou G)",
  "Toucas ou gorros de algodão + 01 pct de fralda (P, M ou G)",
  "Macacão manga curta + 01 pct de fralda (P, M ou G)",
  "Macacão manga comprida + 01 pct de fralda (P,M ou G)",
  "Macacão manga curta + 01 pct de fralda (P,  M ou G)",
  "Macacão manga comprida + 01 pct de fralda (P, M ou G)",
  "Macacão manga curta + 01 pct de fralda (P,M ou G)",
  "Macacão manga comprida + 01 pct de fralda (P, M  ou G)",
  "Meias + 01 pct de fralda (P, M ou G)",
  "Trocador de bolsa + 01 pct de fralda (P, M ou G)",
  "Kit para berço de algodão + 01 pct de fralda (P, M ou G)",
  "Lençol para berço + 01 pct de fralda (P,M ou G)",
  "Lençol  para berço + 01 pct de fralda (P, M ou G)",
  "Lençol para berço + 01 pct de fralda (P,  M ou G)",
  "Travesseiro antirrefluxo + 01 pct de fralda (P, M ou G)",
  "Travesseiro posicionador de bebê + 01 pct de fralda (P, M ou G)",
  "Mosquiteiro para berço + 01 pct de fralda (P, M ou G)",
  "Cobertor de bebê + 01 pct de fralda (P, M ou G)",
  "Fronhas + 01 pct de fralda (P, M ou G)",
];

const Gifts = () => {
  const [selectedGift, setSelectedGift] = useState("");
  const [chosenGifts, setChosenGifts] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("chosenGifts");
    if (saved) {
      setChosenGifts(JSON.parse(saved));
    }
  }, []);

  const handleGiftConfirmation = () => {
    if (!selectedGift) {
      toast({
        title: "Selecione um presente",
        description: "Por favor, escolha um presente da lista.",
        variant: "destructive",
      });
      return;
    }
    setShowConfirm(true);
  };

  const confirmGift = () => {
    const participant = JSON.parse(localStorage.getItem("participant") || "{}");
    const giftData = {
      gift: selectedGift,
      participant: participant.name,
      companion: participant.companion,
    };
    
    const updatedGifts = [...chosenGifts, selectedGift];
    localStorage.setItem("chosenGifts", JSON.stringify(updatedGifts));
    
    const gifts = JSON.parse(localStorage.getItem("giftsList") || "[]");
    localStorage.setItem("giftsList", JSON.stringify([...gifts, giftData]));
    
    setChosenGifts(updatedGifts);
    setShowConfirm(false);
    
    toast({
      title: "Presente confirmado!",
      description: "Obrigado por participar do chá de bebê da Julia!",
    });
  };

  // Função para extrair o nome base do presente (sem a parte do pacote de fralda)
  const getGiftBaseName = (gift: string) => {
    return gift.split(" + ")[0];
  };

  // Função para verificar se já existe um presente similar escolhido
  const isSimilarGiftChosen = (gift: string) => {
    const giftBaseName = getGiftBaseName(gift);
    return chosenGifts.some(chosenGift => getGiftBaseName(chosenGift) === giftBaseName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-6 backdrop-blur-lg bg-white/80 shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            Escolha um presente
          </h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4">
            {gifts.map((gift, index) => {
              const isSimilarChosen = isSimilarGiftChosen(gift);
              const isSelected = selectedGift === gift;

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    id={`gift-${index}`}
                    checked={isSelected}
                    disabled={isSimilarChosen && !isSelected}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedGift(gift);
                      } else {
                        setSelectedGift("");
                      }
                    }}
                  />
                  <label
                    htmlFor={`gift-${index}`}
                    className={`flex-1 cursor-pointer ${
                      isSimilarChosen && !isSelected
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {gift}
                  </label>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-6">
            <Button
              onClick={handleGiftConfirmation}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
            >
              Confirmar Presente
            </Button>
          </div>
        </Card>
      </motion.div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar presente</AlertDialogTitle>
            <AlertDialogDescription>
              Você escolheu: {selectedGift}
              <br />
              Deseja confirmar sua escolha?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmGift}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Gifts;
