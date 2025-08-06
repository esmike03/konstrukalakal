import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isTermnServicesModalOpen, setTermnServicesModalOpen] = useState(false);
    const [isMaterialOpen, setMaterialOpen] = useState(false);

    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);
    const openRegisterModal = () => setRegisterModalOpen(true);
    const closeRegisterModal = () => setRegisterModalOpen(false);
    const openTermnServicesModal = () => setTermnServicesModalOpen(true);
    const closeTermnServicesModal = () => setTermnServicesModalOpen(false);
    const openMaterialModal = () => setMaterialOpen(true);
    const closeMaterialModal = () => setMaterialOpen(false);

    return (
        <ModalContext.Provider value={{
            isLoginModalOpen, openLoginModal, closeLoginModal,
            isRegisterModalOpen, openRegisterModal, closeRegisterModal,
            isTermnServicesModalOpen, openTermnServicesModal, closeTermnServicesModal,
            isMaterialOpen, openMaterialModal, closeMaterialModal,
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
