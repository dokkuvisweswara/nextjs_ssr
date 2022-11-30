import Link from "next/link";
import { useEffect } from "react";
import Shows from "../Shows";

export default function ComponentTwo() {
    useEffect(() => {
        console.log("kkkkk", "hello");
    }, [])
    return (
      <>
      <h1> Hello sumit </h1>      
      <Shows />
      </>
    )
}