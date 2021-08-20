// __tests__/CheckboxWithLabel-test.js

import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from "enzyme";

import Gravatar from "react-gravatar";
import {Card,Button} from "react-bootstrap";
import AdminUserPaymentCard from "../AdminUserPaymentCard";

configure({adapter: new Adapter()});
describe("<AdminFundraserCard />", () => {
	const name = "jokowiddod";
	const email = "jokowiddo@gmail.com";
	const bankName = "BCA"
	const amount=10000000;
	const accountNumber= "1293048231";

	const component = 
		<AdminUserPaymentCard
			name={name}
			email={email}
			amount={amount}
			bankName={bankName}
			accountNumber={accountNumber}
		/>
	const card = shallow(
		component
	);

	it('have a gravatar',() => {
		expect(card.find(Gravatar)).toBeTruthy();
	});

	it('is a card',() => {
		expect(card.find(Card)).toBeTruthy();
		expect(card.find(Card.Body)).toBeTruthy();
		expect(card.find(Card.Title)).toBeTruthy();
	});

	it('contains name',() => {
		expect(card.text()).toMatch(new RegExp(name));
	});

	it('contains 2 cardrow',() => {
		expect(card.find(Button)).toHaveLength(2);
	});

	it('contains props', () => {
		expect(card.text()).toMatch(new RegExp(name));
		expect(card.text()).toMatch(new RegExp(amount.toString()));
		expect(card.text()).toMatch(new RegExp(bankName));
		expect(card.text()).toMatch(new RegExp(accountNumber));
	});

});
