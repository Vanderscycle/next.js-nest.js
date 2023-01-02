import { Button } from "@mui/material";
import { BackendApi } from "lib/api";
import { UserInterface, UserState } from "lib/interfaces";
import React, { Component } from 'react';
import { userStore } from "stores/store";

const endpoints: string = 'supporters'
const payload: UserInterface = { name: `Mr Math ${Math.random()}`, username: 'testUsername', password: 'testPass' }
const api: BackendApi = new BackendApi(endpoints);

let users: UserInterface[]

async function newUser(): Promise<void> {
  const res = await api.post(payload)
  // users = userStore.addUser((state:UserState) => payload)
}

export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  console.log('fetching data')
  const res = await api.get()
  // console.log(res)
  // const res = await api.post(payload)
  const supporters = res ? res : ''
  return {
    props: {
      supporters,
    },
  }
}

class Index extends Component {
  state = {}

  render() {
    return (
      <div>
        <h1>Our Index Page!!</h1>

        <Button onClick={async () => { await newUser(); }} >test</Button>
        <h2> Supporters: {this.props.supporters.map(supporter => <li key={supporter.id}>id: {supporter.id} name: {supporter.name} username: {supporter.username}</li>)}</h2>
      </div>
    );
  }
}
export default Index
