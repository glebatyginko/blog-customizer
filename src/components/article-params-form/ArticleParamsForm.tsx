import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	const toggleSidebar = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => handleChange('fontColor', value)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => handleChange('backgroundColor', value)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleChange('contentWidth', value)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
