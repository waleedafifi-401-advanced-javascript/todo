import React, { useContext, useState, useEffect } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup'
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SortContext } from '../../context/sort'
import { CompleteContext } from '../../context/completed'
import { NumPerScreenContext } from '../../context/pagenation'
import { LoginContext } from '../auth/context';
import Auth from '../auth/auth';

export default (props) => {

  const sortContext = useContext(SortContext);
  const completeContext = useContext(CompleteContext);
  const numPerScreenContext = useContext(NumPerScreenContext);
  const loginContext = useContext(LoginContext);

  const { numPer } = numPerScreenContext;

  const [activePage, setActivePage] = useState(1);
  const [pagesToRender, setPagesToRender] = useState(props.list);

  const numOfPaginationPages = () => {
    if (!completeContext.showComplete) {
      const pages = props.list.filter(item => !item.complete).length / numPer;
      return Math.ceil(pages);
    }
    else {
      return Math.ceil(props.list.length / numPer);
    }
  }

  const paginate = () => {
    let items = [];
    for (let i = 1; i <= numOfPaginationPages(); i++) {
        items.push(
          <Pagination.Item  key={i} active={i === activePage} onClick={() => changePage(i)} activeLabel={i === activePage && '(current)'}>
            {i}
          </Pagination.Item>
        )  
    }
    return items;
  }

  
  const changePage = async (num) => {
    await setActivePage(num);
    let pages = props.list;
    if (!completeContext.showComplete) {
      pages = pages.filter(item => item.complete === false);
    }
    pages = pages.sort((a, b) => a[sortContext.sortBy] < b[sortContext.sortBy] ? -1 : 1)
    
    let newPages = pages.slice((num * numPer - numPer),(num * numPer));
    await setPagesToRender(newPages);
  }

  useEffect(() => {
    let pages = props.list;
    if (!completeContext.showComplete) {
      pages = pages.filter(item => item.complete === false);
    }
    pages = pages.sort((a, b) => a[sortContext.sortBy] < b[sortContext.sortBy] ? -1 : 1)
    setPagesToRender(pages.slice((activePage * numPer - numPer),(activePage * numPer)));

  }, [props.list, completeContext.showComplete, sortContext.sortBy, activePage, numPer])

  async function onComplete (id) {
    await props.handleComplete(id);
  }

  const badgeCursor = loginContext.can('update') ? 'pointer' : 'default';

  return (
    <>
      <Card.Header>
        <Row>
          <Col md={10}>
            Show Completed Tasks
          </Col>
          <Col md={2}>
            <ButtonGroup toggle className="mb-2">
              <ToggleButton
                type="checkbox"
                variant= {completeContext.showComplete ? "success" : "danger"}
                checked = {completeContext.showComplete}
                onChange={(e) => console.log(completeContext.setShowComplete(!completeContext.showComplete ? true : false))}
              >
                {completeContext.showComplete.toString()}
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Header>
      {
        pagesToRender
          .map(item =>
            (completeContext.showComplete || !item.complete) 
            && (
              <Toast 
                key={item._id} 
                onClose={() => props.handleDelete(item._id)} 
                style={{position: 'relative'}}
              >
                <Toast.Header closeButton={loginContext.can('delete')}>
                  <Auth capabilty="update">
                    <Badge
                      pill
                      style={{marginRight: '15px', cursor: badgeCursor}}
                      onClick={() => loginContext.can('update') &&  onComplete(item._id)}
                      variant={item.complete ? 'danger' : 'success'}>
                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>
                  </Auth>
                  <strong className="mr-auto">{item.assignee}</strong>
                </Toast.Header>
                <Toast.Body>
                  {item.text}
                </Toast.Body>
                <small style={{ position: 'absolute', bottom: 5, right: 5 }}>Difficulty: {item.difficulty}</small>
              </Toast>
            )
          )
        }
      <Pagination>
        {/* <Pagination.Prev /> */}
        {paginate()}
        {/* <Pagination.Next /> */}
      </Pagination>
    </>
  );
};