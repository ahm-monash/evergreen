import React from 'react'
import makeCollapsibleTable from '../components/CollapsibleTable'
import Row from '../components/Row'

import Head from 'next/head';
import Layout from '../components/layout';
import Script from "next/script";
import styles from '../components/treeView.module.css';

import cachedData from "../cachedData.json";

import { JSObjectFromJSON, jsonToDualTreeView, jsonToInverseTreeView, jsonToTreeView } from "../components/dataProcessing";
import { Colours } from '../components/Colours';

const Borders = {
	black: (".5rem solid " + Colours.ahmBlack) as any,
	blackHalved: (".25rem solid " + Colours.ahmBlack) as any,
}

const DividingBar = (
	<Layout>
		<div style={{ justifyContent: "center", height: "max-content", width: "85.5vw", border: Borders.blackHalved }}></div>
	</Layout>
)

const TopBarStyle = {
	justifyContent: "center",
	height: "max-content",
	width: "85vw",
	border: Borders.black,
	borderBottom: "none",
	padding: 0,
	marginTop: '2rem'
}

const MiddleBarStyle = {
	justifyContent: "center",
	height: "max-content",
	width: "85vw",
	border: Borders.black,
	borderTop: "none",
	borderBottom: "none",
	padding: 0
}

const BottomBarStyle = {
	justifyContent: "center",
	height: "max-content",
	width: "85vw",
	border: Borders.black,
	borderTop: "none",
	padding: 0
}

export default function Home() {
	//Converts the raw loaded data into a more useable form
	//This is what all functions should use, rather than relying on any specifics of the JSON represetnation (which is not stable).
	const JSObject = JSObjectFromJSON(cachedData)

	//Get a reference to each name, as the names are changed(autogenerated) after compilation
	const Styles = {
		caret: styles.caret,
		active: styles.active,
		nested: styles.nested,
		caret_down: styles.caret_down,
	};

	var res = (
		<div className="container">
			<Script id="toggle-treeview">{`
				var toggler = document.getElementsByClassName("${Styles.caret}")
				var i

				for (i = 0; i < toggler.length; i++) {
					toggler[i].addEventListener("click", function () {
						this.parentElement.parentElement.querySelector(".${Styles.nested}").classList.toggle("${Styles.active}");
						this.classList.toggle("${Styles.caret_down}");
					})
				}
			`}</Script>

			<Head>
				<title>Evergreen dashboard</title>
			</Head>
			<main style={{ padding: 0 }}>
				<Layout>
					<div style={TopBarStyle}>
						<h1 className="title" style={{ padding: "0 32px", fontWeight: 600 }}>
							evergreen
						</h1>
					</div>
				</Layout>
				{DividingBar}
				<Layout>
					<div style={MiddleBarStyle}> {makeCollapsibleTable(JSObject)} </div>
				</Layout>
				{DividingBar}
				<Layout>
					<div style={MiddleBarStyle}><div style={{ padding: 10 }}>
						{jsonToTreeView(JSObject)}
					</div></div>
				</Layout>
				{DividingBar}
				<Layout>
					<div style={MiddleBarStyle}><div style={{ padding: 10 }}>
						{jsonToInverseTreeView(JSObject)}
					</div></div>
				</Layout>
				{DividingBar}
				<Layout>
					<div style={BottomBarStyle}><div style={{ padding: 10 }}>
						{jsonToDualTreeView(JSObject)}
					</div></div>
				</Layout>
			</main>
		</div>
	);

	return res;
}
