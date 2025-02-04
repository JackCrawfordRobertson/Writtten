import React, { useState, useEffect } from "react";
import { TreeMap, TreeMapSeries, TreeMapRect } from "reaviz";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import "./App.css";
import data from "./Data.json";
import Logo from "./logo.svg";

const App = () => {
    const [open, setOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
        const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    }, []);

    const handleClick = (event, data) => {
        setSelectedNode(data);
        setOpen(true);
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1 className="title-with-logo">
                    Written Work
                    <img src={Logo} alt="Logo" className="logo" />
                </h1>
                <p className="paragraph-text">
                    In this online archive, I've authored a series of stories, each represented by a rectangle. These rectangles visually estimate the carbon emissions associated with various topics, including companies, themes, and individuals. My goal is to provide a clear understanding of environmental impacts. I prioritize accuracy, use reliable data, and offer transparent explanations to ensure credibility and effectiveness.
                </p>
            </div>
            <div className="App-content">
                <TreeMap
                    data={data}
                    width={"100%"}
                    height={"100%"}
                    series={<TreeMapSeries rect={<TreeMapRect onClick={handleClick} />} />}
                />
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                    <DialogTitle className="dialog-title">
                        {selectedNode ? selectedNode.data.key : "Loading..."}
                    </DialogTitle>
                    <DialogContent className="dialog-content">
                        {selectedNode && (
                            <>
                                <div className="image-grid">
                                    {selectedNode.data.imageUrl
                                        .split(",")
                                        .map(
                                            (url, index) =>
                                                url.trim() && (
                                                    <img
                                                        key={index}
                                                        src={url.trim()}
                                                        alt={`${index}`}
                                                        className={`grid-item grid-item-${index}`}
                                                    />
                                                )
                                        )}
                                </div>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: selectedNode.data.description.replace(/\n/g, "<br>"),
                                    }}
                                    className="dialog-description"
                                />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default App;