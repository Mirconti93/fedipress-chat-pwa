import {Col, Nav, NavItem, NavLink, Row} from "react-bootstrap";

export const Footer = () => {
    return (
        <div>
            <hr className="mb-0 mt-0"/>
            <footer className="bg-light p-3">
                <Row>
                    <Nav>
                        <NavItem>
                            <NavLink as="span">This demo is Powered by <a href="https://chatscope.io">chatscope</a></NavLink>
                        </NavItem>
                    </Nav>
                </Row>
            </footer>
        </div>
    );
};