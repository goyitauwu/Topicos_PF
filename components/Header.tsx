import { MouseEvent } from 'react';
import Link from 'next/link';
import HeaderCart from './cart/HeaderCart';
import ChooseVariantModal from './header/ChooseVariantModal';
import logoImg from '../assets/logo.svg';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../hooks/redux';
import { setIsOpened } from '../redux/reducers/asideMenu';
import HeaderLogin from './login/HeaderLogin';
import HeaderLogout from './login/HeaderLogout';

export default function Header({ companyTitle }: { companyTitle?: string }) {
	const dispatch = useAppDispatch();

	const onHamburgerBtnClicked = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(setIsOpened(true));
	};
	const login = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(setIsOpened(true));
	};
	const logout = (e: MouseEvent<HTMLButtonElement>) => {
		localStorage.removeItem('email');
	};

	const title = companyTitle || 'Your Company LLC.';

	return (
		<header className='page-header'>
			<div className='container'>
				<div className='page-header__content'	>
					<div className={'page-header__right-blocks'}>
						<HeaderLogin />login
					</div>
					<div className='page-header__logo'>
						<Link href='/'>
							<a>
								<img src={logoImg.src} width={logoImg.width} height={logoImg.height} alt={title} />
							</a>
						</Link>
					</div>
					<div className={'page-header__right-blocks'}>
						<HeaderCart />
						<button type={'button'}
							className={'btn btn-outline-secondary page-header__hamburger'}
							onClick={onHamburgerBtnClicked}
						>
							<FontAwesomeIcon icon={faBars} />
						</button>
					</div>
					<div className={'page-header__right-blocks'}>
						<button onClick={logout}>
							<HeaderLogout />logout
						</button>
					</div>
				</div>
			</div>
			<ChooseVariantModal />
		</header>
	);
}
