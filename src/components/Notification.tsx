import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  show: boolean;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="absolute bottom-20 md:bottom-10 w-full flex justify-center pointer-events-none z-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-marvel-gold text-marvel-dark font-bold py-2 px-6 rounded shadow-lg border border-yellow-300"
          >
            <p>{message}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Notification;