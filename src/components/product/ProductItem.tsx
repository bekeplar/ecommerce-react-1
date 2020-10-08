import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';

import { removeFromBasket, addToBasket } from 'actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import ImageLoader from '../ui/ImageLoader';
import { IProduct } from 'types/typings';

interface IProps {
	product: IProduct;
	onOpenModal: () => void;
	displaySelected: (product: IProduct) => void;
	foundOnBasket: boolean;
	children?: React.ReactNode;
}

const ProductItem: React.FC<IProps> = ({
	product,
	onOpenModal,
	displaySelected,
	foundOnBasket
}) => {
	const dispatch = useDispatch();

	const onClickItem = (): void => {
		if (product.id) {
			onOpenModal();
			displaySelected(product);
		}
	};

	const onAddToBasket = (): void => {
		if (foundOnBasket) {
			dispatch(removeFromBasket(product.id));
			displayActionMessage('Item removed from basket', 'info');
		} else {
			dispatch(addToBasket(product));
			displayActionMessage('Item added to basket', 'success');
		}
	};

	return (
		<SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
			<div
				className={`product-card ${!product.id ? 'product-loading' : ''}`}
				style={{
					border: foundOnBasket ? '1px solid #cacaca' : '',
					boxShadow: foundOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
				}}
			>
				{foundOnBasket && <i className="fa fa-check product-card-check" />}
				<div
					className="product-card-content"
					onClick={onClickItem}
				>
					<div className="product-card-img-wrapper">
						{product.image ? (
							<ImageLoader
								className="product-card-img"
								src={product.image}
							/>
						) : <Skeleton width={'100%'} height={'90%'} />}
					</div>
					<div className="product-details">
						<h5 className="product-card-name text-overflow-ellipsis margin-auto">{product.name || <Skeleton width={80} />}</h5>
						<p className="product-card-brand">{product.brand || <Skeleton width={60} />}</p>
						<h4 className="product-card-price">{product.price ? displayMoney(product.price) : <Skeleton width={40} />}</h4>
					</div>
				</div>
				{product.id && (
					<button
						className={`product-card-button button-small button button-block ${foundOnBasket ? 'button-border button-border-gray' : ''}`}
						onClick={onAddToBasket}
					>
						{foundOnBasket ? 'Remove from basket' : 'Add to basket'}
					</button>
				)}

			</div>
		</SkeletonTheme>
	);
};

export default ProductItem;