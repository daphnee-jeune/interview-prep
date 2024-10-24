import Tabs from './Tabs';
import Tab from './Tab';

const App = () => {
  return (
    <Tabs>
      <Tab label='Tab 1'>
        <h1>Article 1</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam iure natus accusamus, quibusdam quaerat perspiciatis recusandae doloremque similique sed a culpa iste vel architecto molestiae quia beatae possimus consequuntur distinctio.</p>
      </Tab>
      <Tab label='Tab 2'>
        <h1>Article 2</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam iure natus accusamus, quibusdam quaerat perspiciatis recusandae doloremque similique sed a culpa iste vel architecto molestiae quia beatae possimus consequuntur distinctio.</p>
      </Tab>
    </Tabs>
  );
}

export default App;
