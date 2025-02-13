
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Baby } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-4">
            Chá de Bebê
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Julia está chegando!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sábado, 29 de Março às 15 horas
          </p>
        </div>

        <div className="relative mb-12">
          <img
            src="/lovable-uploads/e48de651-0343-4730-8834-8b7877436441.png"
            alt="Convite do Chá de Bebê"
            className="w-full rounded-lg shadow-xl mx-auto"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Baby className="text-white" size={24} />
            </div>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            onClick={() => navigate("/participant")}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
          >
            Confirmar Presença
          </Button>
        </motion.div>

        <div className="mt-12 text-gray-600">
          <p className="font-medium">Local</p>
          <p>Rua MMDC, 611 - Paulicéia SBC</p>
          <p>Salão de Festas Bloco Luna</p>
          <p>Condomínio Max Vitta 2</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
