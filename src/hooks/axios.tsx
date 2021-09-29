import axios from "axios";
import { useEffect, useState } from "react";

export function Get(url: string) {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(url).then(response => {
			setData(response.data.body);
		});
	}, [url]);
	return data;
}
