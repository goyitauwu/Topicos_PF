import Link from 'next/link';
import logoImg from '../../public/login.png';

export default function HeaderLogin({ className }: { className?: string }) {
	return (
		<Link href={'/login'}>
			<a title="login">
				<span className={'login-header'} />
				<img src={logoImg.src} width='50' height='50' alt='Login' />
			</a>
		</Link >
	);
}