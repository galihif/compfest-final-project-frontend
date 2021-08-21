import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonProfile = ({ theme }) => {
  const themeClass = theme || 'light'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div >
        <Row className="d-flex justify-content-center">
          <SkeletonElement type="avatar" />
        </Row>
        <Row className="d-flex justify-content-center">
          <SkeletonElement type="title" />
        </Row>
        <Row className="d-flex justify-content-center">
          <Col lg={6}>
            <SkeletonElement type="text" />
          </Col>
        </Row>
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonProfile;