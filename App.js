import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RootNavigation from "./Navigation";


export default function App() {
	const [loading, setLoading] = useState(true)

	const allLang = async (value) => {
		try {
			const jsonValue = JSON.stringify(value)
			await AsyncStorage.setItem('allLang', jsonValue)
		} catch (e) {
		  console.log(e)
		}
	  }

	useEffect(()=>{
		//https://thoughtctrl.herokuapp.com/allshorts
		//https://thoughtctrl.herokuapp.com/alllanguage
		fetch("https://thoughtctrl.herokuapp.com/alllanguage")
		.then(res=>res.json())
		.then(data=>{
			allLang(data)
			setLoading(false)
		});
	},[])

	return (
		<>
			{loading ? <></> : <RootNavigation />}
		</>
  );
}