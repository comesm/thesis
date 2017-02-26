import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Background, CardSection, Input, Button } from '../common/';
import { updateStockShare } from '../../actions';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class Sell extends Component {


	onSharesChange(text) {
		this.props.updateStockShare(text);
	}

	onButtonPress() {
		const context = this;
		axios({
			method: 'post',
			url: 'http://127.0.0.1:3000/api/stocks/',
			data: {
				stock: context.props.stockRes.data.Symbol,
				transact: 'sell',
				userId: 1,
				price: context.props.stockRes.data.LastPrice,
				shares: context.props.stockShare,

			}
		}).then(function(response) {
			console.log(response);
		}).catch(function(error) {
			console.log(error)
		});
		Actions.home();
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
					<Button onPress={this.onButtonPress.bind(this)}>
						Confirm
					</Button>
				</CardSection>
			</Background>
	  );
	}
}

const styles = {
	viewStyle: {
		marginTop: 20,
		marginBottom: 10,
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20
	}
};

const mapStateToProps = (state) => {
	const { stockRes, stockShare } = state.search;
	console.log(stockRes);
	console.log('stockshare' , stockShare);
	return ({
		stockShare,
		stockRes
	});
};


export default connect(mapStateToProps, { updateStockShare })(Sell);
