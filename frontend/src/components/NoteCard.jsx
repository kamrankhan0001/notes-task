import { motion } from 'framer-motion';

const NoteCard = ({ note, index, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow relative"
    >
      <p>{note.content}</p>
      <button
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        onClick={() => onDelete(note._id)}
      >
        &times;
      </button>
    </motion.div>
  );
};

export default NoteCard;
