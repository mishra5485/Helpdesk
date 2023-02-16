import React, { Component } from "react";
import axios from "axios";
import UploadedWallpapers from "./UploadedWallpapers";
import NOImageFound from "../assets/undraw_images_re_0kll.svg";
import toast, { Toaster } from "react-hot-toast";

export default class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      WallpaperName: "",
      WallpaperCategory: "",
      wallpaperImage: "",
      uploaded: "",
      file: null,
    };
  }

  handleInputChanged(event) {
    this.setState({
      WallpaperName: event.target.value,
    });
  }

  handleSelect = (e) => {
    this.setState(
      {
        WallpaperCategory: e.target.value,
      },
      () => console.log(this.state.WallpaperCategory)
    );
  };

  handleFile = (click) => {
    this.setState({
      wallpaperImage: click.target.files[0],
      file: URL.createObjectURL(click.target.files[0]),
    });
  };

  handleButtonClicked = (click) => {
    click.preventDefault();
    const formData = new FormData();
    formData.append("wallls", this.state.wallpaperImage);
    formData.append("name", this.state.WallpaperName);
    formData.append("category", this.state.WallpaperCategory);

    axios
      .post(`http://localhost:3001/upload/`, formData)
      .then((res) => {
        toast.success(res.data);
        this.setState({ uploaded: res.data }, () =>
          console.log(this.state.uploaded)
        );
      })
      .catch((err) => {
        toast.error(err);
        console.log(res.data);
      });
  };

  render() {
    return (
      <div>
        <header className="body-font text-gray-600">
          <div className="container mx-auto flex flex-col flex-wrap items-center justify-center p-5 md:flex-row">
            <div className="title-font order-first mb-4 flex items-center font-medium text-gray-900 md:mb-0 lg:order-none lg:w-1/5 lg:items-center lg:justify-center">
              <img src="../logo-cropped.svg" style={{ height: "60px" }} />
            </div>
          </div>
        </header>
        <Toaster position="top-right" />
        <div className="flex justify-center">
          <div className="mt-5 w-full">
            <form
              encType="mutipart/form-data"
              onSubmit={this.handleButtonClicked}
            >
              <div className="mx-4 drop-shadow-md sm:overflow-hidden  sm:rounded-md">
                <div className="flex flex-col lg:flex-row">
                  <div className="w-11/12 space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="">
                      <div className="">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name of Wallpaper
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            value={this.state.name}
                            onChange={this.handleInputChanged.bind(this)}
                            className="-md block w-full flex-1 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <div className="mt-1">
                        <select
                          className="flex w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={this.handleSelect}
                        >
                          <option disabled defaultValue>
                            Select a Category
                          </option>
                          <option value="mobile">Mobile</option>
                          <option value="desktop">Desktop</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload photo
                      </label>
                      <div
                        className="mt-1 flex justify-center  rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                        htmlFor="file-upload"
                      >
                        <div className="space-y-1 text-center">
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                type="file"
                                className="sr-only"
                                name="file"
                                onChange={this.handleFile}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[330px] w-full items-center justify-center">
                    {this.state.file === null ? (
                      <div className="ml-auto mr-auto h-[205px] max-h-64 justify-center text-center ">
                        <img
                          src={NOImageFound}
                          className="h-[-webkit-fill-available] lg:w-full"
                        />
                        <h1>No Image Selected</h1>
                      </div>
                    ) : (
                      <img
                        src={this.state.file}
                        className="flex h-[inherit] rounded-md object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="px-4 py-5 text-center sm:px-6">
                  <button
                    className=" inline-flex w-48 justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={this.handleButtonClicked}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <UploadedWallpapers status={this.state.uploaded} />
      </div>
    );
  }
}
