'use client';
import React from 'react';

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-500 font-bold">
          Đã xảy ra lỗi hệ thống. Vui lòng tải lại trang.
        </div>
      );
    }
    return this.props.children;
  }
}