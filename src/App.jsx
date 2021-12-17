import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import SearchBar from "./components/Searchbar/searchBar";
import ImageGallery from "./components/ImageGallery/imageGallery";
import Button from "./components/Button/button";
import Modal from "./components/Modal/modal";


export default class App extends Component {
  state = {
    isLoading: false,
    keyword: "",
    images: [],
    page: 1,
    hitsFetched: "",
    isModalOpen: false,
    modalPicture: "",
  };

  fetchImages(keyword, page) {
    try {
      fetch(
        `https://pixabay.com/api/?q=${keyword}&page=${page}&key=24786673-9719307b3060b1db9d5523594&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((data) => data.json())
        .then((data) => {
          this.state.page === 1
            ? this.setState({
                images: data.hits,
                page: page + 1,
                isLoading: false,
                hitsFetched: data.hits.length,
              })
            : this.setState({
                images: [...this.state.images, ...data.hits],
                page: page + 1,
                isLoading: false,
                hitsFetched: data.hits.length,
              });
        })
        .finally(() => this.setState({ isLoading: false }));
    } catch (error) {
      console.error(error);
    }
  }

  onSubmit = (e) => {
    const { keyword, page } = this.state;
    e.preventDefault();
    const form = e.target;
    this.fetchImages(keyword, page);
    form.reset();
  };

  onSetKeyword = (e) => {
    this.setState({ images: [] });
    this.setState({ page: 1 });
    this.setState({ keyword: e.target.value });
    this.setState({ isLoading: true });
  };

  loadMore = (e) => {
    const { keyword, page } = this.state;
    e.preventDefault();
    this.fetchImages(keyword, page);
    setTimeout(() => {
      window.scrollBy({
        top: 400,
        behavior: "smooth",
      });
    }, 500);
  };

  openModal = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    this.setState({
      modalPicture: e.target.dataset.img,
      isModalOpen: true,
    });
  };

  closeModalWithEsc = (e) => {
    if (e.code === "Escape") {
      this.setState({ isModalOpen: false });
    }
  };

  closeModal = (e) => {
    if (e.target.nodeName === "IMG") {
      return;
    }
    this.setState({ isModalOpen: false });
  };
  render() {
    window.addEventListener("keydown", this.closeModalWithEsc);
    return (
      <div className="App">
        <SearchBar onSubmit={this.onSubmit} onSetKeyword={this.onSetKeyword} />
        <ImageGallery items={this.state.images} openModal={this.openModal} />
        {this.state.isLoading === true ? (
          <Loader
            className="loader"
            type="ThreeDots"
            color="#FF0000"
            height={150}
            width={150}
          />
        ) : (
          <></>
        )}
        {this.state.images.length < 1 ? (
          <></>
        ) : this.state.hitsFetched < 12 ? (
          <>No more results</>
        ) : (
          <Button loadMore={this.loadMore} />
        )}
        {this.state.isModalOpen === true ? (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.modalPicture} alt={"something"} />
          </Modal>
        ) : (
          <></>
        )}
      </div>
    );
  }
}