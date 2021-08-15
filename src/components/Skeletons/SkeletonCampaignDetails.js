import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'

const SkeletonCampaignDetails = ({ theme }) => {
  const themeClass = theme || 'light'

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-article">
        <SkeletonElement type="detail-image" />
        <SkeletonElement type="title" />
        <SkeletonElement type="avatar-small" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <br/>
        <SkeletonElement type="detail-button" />
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonCampaignDetails;