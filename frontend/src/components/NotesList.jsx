import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { useState } from 'react';

const NotesList = ({ notes, setNotes }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedNotes = Array.from(notes);
    const [removed] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, removed);
    setNotes(reorderedNotes);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="notes">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid gap-4 md:grid-cols-2"
          >
            {notes.map((note, index) => (
              <Draggable key={note._id} draggableId={note._id} index={index}>
                {(provided) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 cursor-pointer"
                  >
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">{note.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{note.content}</p>
                  </motion.div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NotesList;
