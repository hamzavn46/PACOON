import React from 'react'

const SettingIcon: React.FC = () => {
    return (
        <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.70059 1.73618L7.74488 1.5H8.2551L8.29938 1.73618C8.4406 2.48936 8.98357 3.04807 9.63284 3.27226C9.82296 3.33791 10.008 3.41476 10.1871 3.50207C10.805 3.80328 11.5845 3.7922 12.2172 3.35933L12.4158 3.22342L12.7766 3.5842L12.6407 3.78284C12.2078 4.41549 12.1967 5.19496 12.4979 5.81292C12.5852 5.99203 12.6621 6.17703 12.7277 6.36714C12.9519 7.01642 13.5106 7.55938 14.2638 7.7006L14.5 7.74489V8.25511L14.2638 8.2994C13.5106 8.44062 12.9519 8.98359 12.7277 9.63286C12.6621 9.82298 12.5852 10.008 12.4979 10.1871C12.1967 10.805 12.2078 11.5845 12.6407 12.2172L12.7766 12.4158L12.4158 12.7766L12.2172 12.6407C11.5845 12.2078 10.805 12.1967 10.1871 12.4979C10.008 12.5852 9.82296 12.6621 9.63284 12.7277C8.98357 12.9519 8.4406 13.5106 8.29938 14.2638L8.2551 14.5H7.74488L7.70059 14.2638C7.55937 13.5106 7.0164 12.9519 6.36713 12.7277C6.17702 12.6621 5.99202 12.5852 5.8129 12.4979C5.19495 12.1967 4.41548 12.2078 3.78283 12.6407L3.5842 12.7766L3.22342 12.4158L3.35932 12.2172C3.79219 11.5845 3.80326 10.8051 3.50206 10.1871C3.41475 10.008 3.3379 9.82298 3.27225 9.63285C3.04806 8.98358 2.48935 8.44061 1.73616 8.29939L1.5 8.25511V7.74489L1.73616 7.70061C2.48935 7.55939 3.04806 7.01642 3.27225 6.36715C3.3379 6.17703 3.41475 5.99203 3.50205 5.81291C3.80326 5.19496 3.79218 4.41549 3.35931 3.78283L3.2234 3.5842L3.58418 3.22342L3.78282 3.35932C4.41547 3.79219 5.19494 3.80327 5.8129 3.50207C5.99201 3.41476 6.17701 3.33791 6.36713 3.27226C7.0164 3.04807 7.55937 2.48936 7.70059 1.73618ZM6.49999 0H9.49999L9.77369 1.45974C9.80837 1.64472 9.94454 1.79299 10.1224 1.85441C10.3702 1.93996 10.6111 2.04007 10.8443 2.15371C11.0135 2.2362 11.2148 2.22768 11.3701 2.12137L12.5962 1.28249L14.7175 3.40381L13.8786 4.62987C13.7723 4.78525 13.7638 4.98647 13.8463 5.1557C13.9599 5.38885 14.06 5.62981 14.1456 5.87756C14.207 6.05545 14.3553 6.19161 14.5402 6.2263L16 6.5V9.5L14.5402 9.7737C14.3553 9.80839 14.207 9.94455 14.1456 10.1224C14.06 10.3702 13.9599 10.6112 13.8463 10.8443C13.7638 11.0135 13.7723 11.2148 13.8786 11.3701L14.7175 12.5962L12.5962 14.7175L11.3701 13.8786C11.2147 13.7723 11.0135 13.7638 10.8443 13.8463C10.6111 13.9599 10.3702 14.06 10.1224 14.1456C9.94454 14.207 9.80837 14.3553 9.77369 14.5403L9.49999 16H6.49999L6.22628 14.5403C6.1916 14.3553 6.05544 14.207 5.87755 14.1456C5.6298 14.06 5.38884 13.9599 5.15569 13.8463C4.98645 13.7638 4.78523 13.7723 4.62985 13.8786L3.40381 14.7175L1.28249 12.5962L2.12136 11.3702C2.22767 11.2148 2.23619 11.0136 2.1537 10.8443C2.04006 10.6112 1.93995 10.3702 1.8544 10.1224C1.79297 9.94455 1.6447 9.80838 1.45973 9.7737L0 9.5V6.5L1.45973 6.2263C1.6447 6.19162 1.79297 6.05545 1.8544 5.87756C1.93995 5.62981 2.04005 5.38885 2.1537 5.15569C2.23619 4.98646 2.22766 4.78524 2.12135 4.62986L1.28247 3.40381L3.40379 1.28249L4.62984 2.12136C4.78522 2.22767 4.98644 2.2362 5.15568 2.15371C5.38883 2.04007 5.6298 1.93996 5.87755 1.85441C6.05544 1.79299 6.1916 1.64472 6.22628 1.45975L6.49999 0ZM9.49998 8C9.49998 8.82843 8.82841 9.5 7.99998 9.5C7.17156 9.5 6.49998 8.82843 6.49998 8C6.49998 7.17157 7.17156 6.5 7.99998 6.5C8.82841 6.5 9.49998 7.17157 9.49998 8ZM11 8C11 9.65685 9.65684 11 7.99998 11C6.34313 11 4.99998 9.65685 4.99998 8C4.99998 6.34315 6.34313 5 7.99998 5C9.65684 5 11 6.34315 11 8Z" fill="currentColor"></path>
        </svg>
    )
}

export default SettingIcon
