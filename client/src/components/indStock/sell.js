import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { Background, CardSection, Input, Button } from '../common/';
import { updateStockShare, updateCashValue } from '../../actions';

class Sell extends Component {

	onSharesChange(text) {
		this.props.updateStockShare(text);
	}

	onButtonPress(symbol) {
		const context = this;
		axios({
			method: 'post',
			url: `http://127.0.0.1:3000/api/stocks/${symbol}`,
			data: {
				stock: this.props.stockRes.data.Symbol,
				transact: 'sell',
				email: this.props.email,
				price: this.props.stockRes.data.LastPrice,
				shares: this.props.stockShare,

			}
		}).then(() => {
			Actions.home({ type: 'reset' });
			const price = context.props.stockRes.data.LastPrice;
			const numShares = context.props.stockShare;
			const preBuyCashValue = context.props.cashValue;
			const newCashValue = preBuyCashValue + (price * numShares);
			const roundedCashValue = Math.round(newCashValue * 100) / 100;
			context.props.updateCashValue(roundedCashValue);
		}).catch(error => console.log(error));
	}

	render() {
		const { stockRes, stockShare } = this.props;
		return (
			<Background>
				<CardSection>
					<Input
						label="Shares"
						placeholder="0"
						onChangeText={this.onSharesChange.bind(this)}
						value={this.props.stockShare}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="MKT Price"
						placeholder={JSON.stringify(stockRes.data.LastPrice)}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="EST Cost"
						placeholder={JSON.stringify(Math.round(stockRes.data.LastPrice * stockShare*100)/100)}
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this, this.props.stockRes.data.Symbol)}>
						Confirm
					</Button>
				</CardSection>
			</Background>
		);
	}
}


const mapStateToProps = (state) => {
	const { stockRes, stockShare } = state.search;
	const { cashValue } = state.user;
	const { email } = state.auth;
	return ({
		email,
		stockShare,
		stockRes,
		cashValue
	});
};

export default connect(mapStateToProps, { updateStockShare, updateCashValue })(Sell);
