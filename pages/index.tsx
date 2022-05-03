import React from 'react'
import makeCollapsibleTable from '../components/CollapsibleTable'
import Head from 'next/head';
import Layout from '../components/layout';
import Script from "next/script";
import styles from '../components/treeView.module.css';
import cachedData from "../cachedData.json";
import {JSObjectFromJSON} from "../components/dataProcessing";

export default function Home() {
    //Converts the raw loaded data into a more useable form
    //This is what all functions should use, rather than relying on any specifics of the JSON represetnation (which is not stable).
    const JSObject = JSObjectFromJSON(cachedData[0], cachedData[1] as { dep: number, dependencies: (string | number)[][]}[])
    //Get a reference to each name, as the names are changed(autogenerated) after compilation
    const Styles = {
        caret: styles.caret,
        active: styles.active,
        nested: styles.nested,
        caret_down: styles.caret_down,
        topBarStyle: styles.topBarStyle,
        barStyle: styles.barStyle,
    };
    var res = (
        <div className="container">
            <Script id="toggle-treeview">{`
                var toggler = document.getElementsByClassName("${Styles.caret}")
                var i__
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
                    <div className={Styles.topBarStyle}>
                        <h1 className="title" style={{ padding: "0 32px", fontWeight: 600 }}>
                            evergreen
                        </h1>
                    </div>
                </Layout>
                <Layout>
                    <div className={Styles.barStyle}> {makeCollapsibleTable(JSObject)} </div>
                    
                </Layout>
            </main>
        </div>
    );
    return res;
}