import React, {useState, useEffect} from "react";
import {TreeMap, TreeMapSeries, TreeMapRect} from "reaviz";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import "./App.css";
import data from "./Data.json"; // Import the JSON data
import Logo from "./logo.svg"; // Make sure the path is correct

const App = () => {
    const [ open, setOpen ] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [ setIsMobile] = useState(false);


    useEffect(() => {
        const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
        const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
        setIsMobile(mobile);
    }, []);


    const handleClick = (event, data) => {
        setSelectedNode(data);
        setOpen(true);
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1 style={{marginBottom: "0.2em", textAlign: "left", display: "flex", alignItems: "center"}}>
                    Written Work
                    <img src={Logo} alt="Logo" style={{width: "1em", marginLeft: "8px"}} />
                </h1>
                <p className="paragraph-text">
                    In this online archive, I'll visually estimate carbon emissions linked to stories, companies,
                    themes, or individuals using rectangles. The goal is to provide a clear understanding of
                    environmental impacts. Accuracy, reliable data, and transparent explanations are essential for
                    credibility and effectiveness.
                </p>
            </div>
            <div className="App-content">
                <TreeMap
                    data={data} // Use the imported JSON data
                    width={"100%"}
                    height={"100%"}
                    series={<TreeMapSeries rect={<TreeMapRect onClick={handleClick} />} />}
                />
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                    <DialogTitle style={{paddingBottom: "1em"}}>
                        {selectedNode ? selectedNode.data.key : "Loading..."}
                    </DialogTitle>
                    <DialogContent style={{minWidth: "40vw", minHeight: "30vh", paddingTop: "0"}}>
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
                                    style={{marginBottom: "16px"}}
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
