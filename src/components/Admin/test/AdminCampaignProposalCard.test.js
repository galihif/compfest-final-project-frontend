// __tests__/CheckboxWithLabel-test.js

import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from "enzyme";
import {Button, Card} from "react-bootstrap";

// Component
import Gravatar from "react-gravatar";
import AdminCampaignProposalCard from "../AdminCampaignProposalCard";

configure({adapter: new Adapter()});
describe("<AdminFundraserCard />", () => {
	const title = "saving live";
	const name = "jokowiddod";
	const email = "jokowiddo@gmail.com";
	const target = 100000;

	const component = 
		<AdminCampaignProposalCard 
			title={title}
			name={name}
			email={email}
			target={target}
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

	it('contains props', () => {
		expect(card.text()).toMatch(new RegExp(title));
		expect(card.text()).toMatch(new RegExp(name));
		expect(card.text()).toMatch(new RegExp(email));
		expect(card.text()).toMatch(new RegExp(target));
	});


});
