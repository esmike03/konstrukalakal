import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from '@/Layouts/Layout';
import { ModalProvider } from '@/Context/ModalContext';
import LoginModal from '@/Components/LoginModal';
import CreateModal from '@/Components/CreateModal';

createInertiaApp({
  title: title =>
    title ? `${title} - My App` : "Konstrukalakal",
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    let page = pages[`./Pages/${name}.jsx`];

    page.default.layout = page.default.layout || ((page) => <Layout children={page} />);
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
        <ModalProvider>
            <App {...props} />
            <LoginModal />
            <CreateModal />
        </ModalProvider>
        )
  },
  progress: {
    color: '#008000',
  }
})
