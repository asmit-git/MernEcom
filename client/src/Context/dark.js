import { useState, useEffect, useContext, createContext } from 'react';

const DarkContext = createContext()

const DarkProvider = ({ children }) => {
    const [darkToggle, setDarkToggle] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem("dark");
            setDarkToggle(data);
        //eslint-disable-next-line
    }, []);

    return (
        <DarkContext.Provider value={[darkToggle, setDarkToggle]}>
            {children}
        </DarkContext.Provider>
    )
}

//custom hook
const useDark = () => useContext(DarkContext)

export { useDark, DarkProvider }