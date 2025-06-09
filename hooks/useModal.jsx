import { useState } from "react";

export default function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
        document.body.classList.add("overflow-hidden"); // Prevent scrolling when modal is open
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setModalContent(null), 300); // Delay for smooth closing
        document.body.classList.remove("overflow-hidden");
    };

    return { isOpen, modalContent, openModal, closeModal };
}
