import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

/**
 * A wrapper of the Box element using Framer. Allows for animation.
 */
export const MotionBox = motion<Omit<BoxProps, "transition">>(Box);
