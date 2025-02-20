import { ReactNode } from 'react';
import styles from './GapWrapper.module.scss';

type GapWrapperProps = {
	children: ReactNode;
};

export const GapWrapper = ({ children }: GapWrapperProps) => {
	return <div className={styles.wrapper}>{children}</div>;
};
