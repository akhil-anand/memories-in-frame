import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Grid,
    Box,
    InputLabel,
    FormControl,
    Alert,
    Stack,
    IconButton,
    FormControlLabel,
    RadioGroup,
    Radio
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import ScrollIntoView from 'react-scroll-into-view'

const ImageUpload = ({ onFormSubmit }) => {
    const [formDetails, setFormDetails] = useState({
        fullName: "",
        gender: "",
        profession: "",
        images: [],
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    //   const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     if (files.length !== 6) {
    //       setErrorMessage("Please select exactly 6 images.");
    //       return;
    //     }

    // setErrorMessage(""); // Reset error message if valid
    // const imagePromises = files.map((file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //         reader.readAsDataURL(file);
    //     });
    // });

    // Promise.all(imagePromises)
    //     .then((imageBase64Array) => {
    //         setFormDetails({ ...formDetails, images: imageBase64Array });
    //     })
    //     .catch((error) => console.error("Error uploading images:", error));

    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {

        const imagePromises = Array.from(selectedFiles).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then((imageBase64Array) => {
                setFormDetails({ ...formDetails, images: imageBase64Array });
            })
            .catch((error) => console.error("Error uploading images:", error));

        if (selectedFiles?.length !== 6) {
            return setErrorMessage("Please select exactly 6 images.");
        }

        return () => {
            setErrorMessage("")
        }
    }, [selectedFiles])


    const handleImageChange = (event) => {
        setErrorMessage("")
        const newFiles = event.target.files;
        setSelectedFiles([...selectedFiles, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formDetails)
        if (formDetails.images.length !== 6) {
            setErrorMessage("Please upload exactly 6 images before submitting.");
            return;
        }
        onFormSubmit(formDetails); // Pass the form data back to the parent
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 4 , backgroundColor: 'white', borderRadius: 3}}
        >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Enter Your Details
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formDetails.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl>
                        <RadioGroup
                            row
                            name="gender"
                            value={formDetails.gender}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel value="he/him" control={<Radio />} label="He/Him" />
                            <FormControlLabel value="she/her" control={<Radio />} label="She/Her" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Profession"
                        name="profession"
                        value={formDetails.profession}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>

                <Grid item xs={12} style={{overflow: 'scroll'}}>
                    <InputLabel>Upload Exactly 6 Images:</InputLabel>
                    <FormControl fullWidth margin="normal">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <IconButton color="primary" aria-label="Upload images" component="label">
                                <CloudUploadIcon />
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleImageChange}
                                    required
                                />
                            </IconButton>
                            <Typography variant="caption">Upload images</Typography>
                            {selectedFiles.length > 0 && (
                                <Stack direction="row" spacing={1}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <img src={URL.createObjectURL(file)} alt="Uploaded Image" width="50" height="50" />
                                            <IconButton color="error" onClick={() => handleFileRemove(index)}>
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                    </FormControl>
                </Grid>

                {errorMessage && (
                    <Grid item xs={12}>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                )}
                <Grid item xs={12} display="flex" justifyContent="center">
                <ScrollIntoView selector="#personality">
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </ScrollIntoView>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ImageUpload;
