import { BackendApi } from "lib/api";
import { UserInterface } from "lib/interfaces";
import React, { Component } from 'react';

const endpoints: string = 'supporters'
const payload: UserInterface = { name: `Mr Math ${Math.random()}`, username: 'testUsername', password: 'testPass' }
const api: BackendApi = new BackendApi(endpoints);

// TODO: figure out the one button to add stuff
// const newSupporter = async () => {
//   const res = await api.post(payload)
//   return res


// }
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
    // console.log(this.props.supporters, 'test')
    return (
      <div>
        <h1>Our Index Page!!</h1>
        {/* <button onClick={newSupporter}>one up</button> */}
        <h2> Supporters: {this.props.supporters.map(supporter => <li key={supporter.id}>name: {supporter.name}username: {supporter.username}</li>)}</h2>
      </div>
    );
  }
}
export default Index
