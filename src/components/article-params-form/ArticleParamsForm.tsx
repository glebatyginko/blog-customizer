import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { GapWrapper } from 'src/ui/gap-wrapper/GapWrapper';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
	});

	const toggleSidebar = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleFontSizeChange = (value: typeof selectedFontSize) => {
		setSelectedFontSize(value);
	};

	const handleFontFamilyChange = (selected: typeof selectedFontFamily) => {
		setSelectedFontFamily(selected);
	};

	const handleFontColorChange = (selected: typeof selectedFontColor) => {
		setSelectedFontColor(selected);
	};

	const handleBackgroundColorChange = (
		selected: typeof selectedBackgroundColor
	) => {
		setSelectedBackgroundColor(selected);
	};

	const handleContentWidthChange = (selected: typeof selectedContentWidth) => {
		setSelectedContentWidth(selected);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<GapWrapper>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							title='Шрифт'
						/>
						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={handleFontSizeChange}
							title='Размер шрифта'
						/>
						<Select
							selected={selectedFontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={selectedBackgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							title='Цвет фона'
						/>
						<Select
							selected={selectedContentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							title='Ширина контента'
						/>
					</GapWrapper>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
