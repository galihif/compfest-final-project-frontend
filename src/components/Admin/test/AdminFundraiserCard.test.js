// __tests__/CheckboxWithLabel-test.js

import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure} from "enzyme";
import AdminFundraiserCard from "../AdminFundraiserCard";
import Gravatar from "react-gravatar";
import { Button,Card } from "react-bootstrap";

configure({adapter: new Adapter()});
describe("<AdminFundraserCard />", () => {
	const card = shallow(
		<AdminFundraiserCard
			title="jokowiddod"
			email="jokowiddo@gmail.com"
			description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used demonstrate the visual ..."
		/>
	);
	it('have a gravatar',() => {
		expect(card.find(Gravatar)).toBeTruthy();
	});
	it('have 3 buttons',() => {
		expect(card.find(Button)).toHaveLength(3);
	});
	it('is a card',() => {
		expect(card.find(Card)).toBeTruthy();
		expect(card.find(Card.Body)).toBeTruthy();
		expect(card.find(Card.Title)).toBeTruthy();
	});

});
