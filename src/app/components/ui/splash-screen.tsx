import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-accent"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.img
            src="/logo-ipsum.svg"
            alt="Logo"
            className="w-44"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            onAnimationComplete={() => {
              setTimeout(() => setVisible(false), 900);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
