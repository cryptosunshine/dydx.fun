import Link from 'next/link';
const Less = require('@/styles/404.module.less')

const NotFoundPage = () => {
    return (
        <div className={Less.container}>
            <h1 className={Less.title}>404 - Page Not Found</h1>
            <p className={Less.description}>The page you are looking for does not exist.</p>
            <Link href="/">Go back to home</Link>

        </div>
    );
};

export default NotFoundPage;
