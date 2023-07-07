import React, { useState } from 'react'
import LabelStudio from "label-studio";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { postJSON } from '../../backend/Data';

function LabelStudioTest() {

    const {goatId} = useParams();
    const url = "https://picsum.photos/id/" + `${goatId}` + "/400/400";
    let inidata = []
    let finaldata = []


    const fetchData = ()=> {
        fetch('http://localhost:8000/image/getAnnots/' + `${goatId}/`)
        .then(results => results.json())
        .then(data => {
           console.log(data?.data) 
           inidata = structuredClone(data?.data);
           
        });
      }
      useEffect(() => {
           fetchData(); 
           console.log("ini data", inidata) 
      }, []);

    const handleSubmit = () => {
        const body = {'goat_id':goatId, 'data': finaldata}
        console.log("body", body);
        const addimage_url = "http://localhost:8000/image/addAnnot/"
        postJSON(addimage_url, body);
    };


    useEffect(() => {
      new LabelStudio("label-studio", {
        config: `
          <View>
          <RectangleLabels name="tag" toName="img">
              <Label value="Label 1"></Label>
              <Label value="Label 2"></Label>
              <Label value="Label 3"></Label>
              <Label value="Label 4"></Label>
              <Label value="Label 5"></Label>
            </RectangleLabels>
            <Image name="img" value="$image"></Image>
          </View>
        `,
  
        interfaces: [
          "panel",
          "update",
          "submit",
          "controls",
          "side-column"
        
        ],
  
        user: {
          pk: 1,
          firstName: "James",
          lastName: "Dean"
        },
  
        task: {
          annotations: [],
          predictions: [],
          id: 1,
          data: {
            image:
              url
          }
        },
  
        onLabelStudioLoad: function (LS) {
            // structuredClone(inidata.serializeAnnotation());
          var c = LS.annotationStore.addAnnotation({
            userGenerate: true
          });
          LS.annotationStore.selectAnnotation(c.id);
        },
        onSubmitAnnotation: function (LS, annotation) {
          // retrive an annotation
          
        
            finaldata = structuredClone(annotation.serializeAnnotation());


          handleSubmit();
          console.log(annotation.serializeAnnotation());
        }
      });
    }, [url]);
  
    return (
      <div
        id="label-studio"
        style={{
          backgroundColor: "white",
          padding: 10,
          height: "400px",
          overflowY: "scroll",
          marginLeft:"50px"
        }}
      ></div>
    );
  }

  export default LabelStudioTest;
  