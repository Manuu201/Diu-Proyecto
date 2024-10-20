import React, { createContext, useState, useContext } from 'react';

const PostulationSystem = createContext();

export const usePostulation = () => useContext(PostulationSystem);

export const PostulationProvider = ({ children }) => {
  const [postulaciones, setPostulaciones] = useState([]);

  const addPostulacion = (newPostulaciones) => {
    setPostulaciones(prev => [...prev, ...newPostulaciones]);
  };

  const removePostulacion = (id) => {
    setPostulaciones(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PostulationSystem.Provider value={{ postulaciones, addPostulacion, removePostulacion }}>
      {children}
    </PostulationSystem.Provider>
  );
};