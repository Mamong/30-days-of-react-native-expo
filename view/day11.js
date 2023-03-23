/**
 * Day 11
 * OpenGL
 * Example from https://github.com/ProjectSeptemberInc/gl-react-native/blob/master/example/src/Simple/index.js
 */
'use strict';

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Util from './utils';
import Slider from '@react-native-community/slider';
import { Shaders, Node } from "gl-react";
import { Surface } from "gl-react-expo";

const shaders = Shaders.create({
    helloGL: {
        frag: `
      precision highp float;
      varying vec2 uv;
      uniform float value;
      void main () {
        gl_FragColor = vec4(uv.x, uv.y, value, 1.0);
      }
    `
    },
    saturation: {
        frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D image;
      uniform float factor;
      void main () {
        vec4 c = texture2D(image, uv);
        const vec3 W = vec3(0.2125, 0.7154, 0.0721);
        gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
      }
    `
    },
    pieProgress: {
        frag: `
      precision mediump float;
      varying vec2 uv;
      uniform vec4 colorInside, colorOutside;
      uniform float radius;
      uniform float progress;
      uniform vec2 dim;
      const vec2 center = vec2(0.5);
      const float PI = acos(-1.0);
      void main () {
        vec2 norm = dim / min(dim.x, dim.y);
        vec2 p = uv * norm - (norm-1.0)/2.0;
        vec2 delta = p - center;
        float inside =
          step(length(delta), radius) *
          step((PI + atan(delta.y, - 1.0 * delta.x)) / (2.0 * PI), progress);
        gl_FragColor = mix(
          colorOutside,
          colorInside,
          inside
        );
      }
    `
    }
});

const HelloGL = ({ value }) =>
    <Node shader={shaders.helloGL} uniforms={{ value }} />

const Saturation = ({ factor, image, ...rest }) =>
    <Node
        {...rest}
        shader={shaders.saturation}
        uniforms={{ factor, image }}
    />

const PieProgress =
    ({
        width = Util.size.width,
        height = 200,
        progress,
        colorInside = [0, 0, 0, 0],
        colorOutside = [0, 0, 0, 0.8],
        radius = 0.4
    }) =>
        <Node
            shader={shaders.pieProgress}
            uniforms={{
                dim: [width, height],
                progress,
                colorInside,
                colorOutside,
                radius
            }}
        />


export default function Day11() {
    const [value, setValue] = useState(0)
    const [saturationFactor, setSaturationFactor] = useState(1)
    const [progress, setProgress] = useState(0)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}><Text style={styles.text}>Gradients:</Text></View>
            <Slider
                maximumValue={1}
                value={0}
                onValueChange={setValue} />
            <Surface style={styles.surface}>
                <HelloGL value={value} />
            </Surface>

            <View style={styles.titleContainer}><Text style={styles.text}>Satuation:</Text></View>
            <Slider
                maximumValue={5}
                value={1}
                onValueChange={setSaturationFactor} />
            <Surface style={styles.surface}>
                <Saturation
                    factor={saturationFactor}
                    image={require('./img/gl.png')}
                />
            </Surface>

            <View style={styles.titleContainer}><Text style={styles.text}>Progress Pie:</Text></View>
            <Slider
                maximumValue={1}
                value={0}
                onValueChange={setProgress} />
            <Surface style={styles.surface} backgroundColor="transparent">
                <PieProgress progress={progress} />
            </Surface>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: "#ffffff"
    },
    titleContainer: {
        alignItems: "center",
        borderTopWidth: Util.pixel,
        borderTopColor: "#aaa",
        borderBottomWidth: Util.pixel,
        borderBottomColor: "#aaa",
        paddingTop: 5,
        paddingBottom: 5
    },
    surface: {
        width: Util.size.width,
        height: 200
    },
    text: {
        fontSize: 16,
    },
});