from manim import *
import numpy as np

class MobiusStrip(ThreeDScene):
    def construct(self):
        # Set the camera orientation for a 3D scene
        self.set_camera_orientation(phi=75 * DEGREES, theta=30 * DEGREES)
        self.camera.set_zoom(0.8)
        
        # Define parameters for the Möbius strip
        R = 3  # Major radius
        r = 1  # Minor radius
        resolution = 100  # Resolution of the parametric surface
        
        # Create the Möbius strip parametric function
        def param_mobius(u, v):
            u = u * 2 * PI  # u ranges from 0 to 2π
            v = (v - 0.5) * 2  # v ranges from -1 to 1
            x = (R + v/2 * np.cos(u/2)) * np.cos(u)
            y = (R + v/2 * np.cos(u/2)) * np.sin(u)
            z = v/2 * np.sin(u/2)
            return np.array([x, y, z])
        
        # Create Möbius strip surface
        mobius = ParametricSurface(
            param_mobius,
            u_range=[0, 1],
            v_range=[0, 1],
            resolution=(resolution, resolution//4),
            checkerboard_colors=[BLUE_D, BLUE_E],
            fill_opacity=0.8,
            stroke_width=0.5,
            stroke_color=WHITE
        )
        
        # Add the Möbius strip to the scene
        self.play(Create(mobius), run_time=2)
        
        # Add a curve showing the single edge of the Möbius strip
        curve_points = [param_mobius(t, 1) for t in np.linspace(0, 1, 100)]
        curve = VMobject()
        curve.set_points_as_corners(curve_points)
        curve.set_color(YELLOW)
        curve.set_stroke(width=5)
        
        self.play(Create(curve), run_time=1.5)
        
        # Rotate the Möbius strip to show its properties
        self.begin_ambient_camera_rotation(rate=0.2)
        self.play(
            Rotate(mobius, angle=2*PI, axis=UP, run_time=6),
        )
        self.stop_ambient_camera_rotation()
        
        # Final frame hold
        self.wait(0.5)

if __name__ == "__main__":
    # This is for running as a script
    from manim import config
    config.pixel_height = 720
    config.pixel_width = 1280
    config.frame_rate = 30
    config.output_file = "mobius_strip"
    config.quality = "medium_quality"
    config.output_dir = "./videos"
    
    scene = MobiusStrip()
    scene.render() 