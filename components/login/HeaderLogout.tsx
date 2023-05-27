import Link from 'next/link';
import logoutImg from '../../public/logout.png';

export default function HeaderLogout({ className }: { className?: string }) {
  return (
    <Link href={'/'}>
      <a title="logout">
        <span className={'login-header'} />
        <img src={logoutImg.src} width='50' height='50' alt='Login' />
      </a>
    </Link >
  );
}