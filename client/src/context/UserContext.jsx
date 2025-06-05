import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);

  // Au montage, essaie de récupérer l'utilisateur sauvegardé
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUserState(JSON.parse(savedUser));
  }, []);

  // À chaque changement d'utilisateur, sauvegarde ou retire du localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Setter pour l'utilisateur
  const setUser = (u) => setUserState(u);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook custom pratique
export function useUser() {
  return useContext(UserContext);
}
