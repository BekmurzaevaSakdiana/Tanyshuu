import { createContext, useState } from "react";

export const ProfileContext = createContext(null);

export default function ContextProvider({ children }) {
  const [value, setValue] = useState();

  return (
    <ProfileContext.Provider value={[value, setValue]}>
      {children}
    </ProfileContext.Provider>
  )
}

