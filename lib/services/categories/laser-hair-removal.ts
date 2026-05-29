import type { ServiceCategory } from "@/lib/types/services";

export const laserHairRemovalCategory: ServiceCategory = {
  id: "laser-hair-removal",
      title: "Laser hair removal",
      description:
        "Laser treatments designed to reduce unwanted hair by targeting follicles. Results build over a course of sessions, with protocols tailored to hair thickness, skin tone, and treatment area.",
      image: {
        src: "/laser.webp",
        alt: "Laser treatment room with soft neutral tones",
        width: 1200,
        height: 800,
      },
      subcategories: [
        {
          id: "laser-hair-removal-sets",
          title: "Laser hair removal — sets",
          description:
            "Curated combinations for popular areas to streamline planning and value. Best results come from a course of sessions timed to your hair growth cycle.",
          image: {
            src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&h=1000&q=80",
            alt: "Laser hair removal treatment concept",
            width: 1000,
            height: 1000,
          },
          procedures: [
            {
              id: "upper-lip-and-chin",
              title: "Upper Lip & Chin",
              description:
                "A focused set targeting visible facial hair for a cleaner look and smoother feel. Treatment settings are adjusted carefully for facial skin sensitivity.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser treatment concept for facial area",
                width: 900,
                height: 900,
              },
              price: { amount: 40, currency: "EUR" },
            },
            {
              id: "bikini-and-abdominal-line",
              title: "Bikini + Abdominal Line",
              description:
                "A set designed for a neat bikini line and a smoother abdominal line. Comfort measures and a conservative start are used when needed.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for bikini line",
                width: 900,
                height: 900,
              },
              price: { amount: 50, currency: "EUR" },
            },
            {
              id: "underarms-and-full-bikini",
              title: "Underarms + Full Bikini",
              description:
                "A popular set for long-lasting smoothness in high-friction areas. Treatment is planned to reduce irritation and help prevent ingrowns over time.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for underarms",
                width: 900,
                height: 900,
              },
              price: { amount: 60, currency: "EUR" },
            },
            {
              id: "underarms-and-lower-legs",
              title: "Underarms + Lower Legs",
              description:
                "A time-saving set focused on everyday smoothness for underarms and lower legs. Best results are achieved with a planned course and consistent spacing.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for legs",
                width: 900,
                height: 900,
              },
              price: { amount: 80, currency: "EUR" },
            },
            {
              id: "underarms-full-bikini-and-lower-legs",
              title: "Underarms + Full Bikini + Lower Legs",
              description:
                "A comprehensive set for smoother skin across key areas. Your plan is tailored to hair type and skin tone for safety and consistency.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for multiple areas",
                width: 900,
                height: 900,
              },
              price: { amount: 100, currency: "EUR" },
            },
            {
              id: "underarms-full-bikini-and-full-legs",
              title: "Underarms + Full Bikini + Full Legs",
              description:
                "A full-coverage set designed to significantly reduce unwanted hair across underarms, bikini, and legs. Best as a structured course aligned to growth cycles.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal set concept for full legs",
                width: 900,
                height: 900,
              },
              price: { amount: 110, currency: "EUR" },
            },
            {
              id: "full-bikini-and-lower-legs",
              title: "Full Bikini + Lower Legs",
              description:
                "A set focused on smoother bikini area and lower legs. Treatment parameters are adjusted for sensitive areas and comfort.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for bikini and legs",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
            {
              id: "full-bikini-and-full-legs",
              title: "Full Bikini + Full Legs",
              description:
                "A high-value set for smoother bikini area and legs. Recommended as a course for sustained reduction and best long-term result.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for full legs",
                width: 900,
                height: 900,
              },
              price: { amount: 100, currency: "EUR" },
            },
            {
              id: "underarms-and-full-legs",
              title: "Underarms + Full Legs",
              description:
                "A practical set for a consistently smooth feel in underarms and legs. Scheduling is tailored to hair growth cycles for optimal reduction.",
              image: {
                src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&h=900&q=80",
                alt: "Laser hair removal concept for underarms and legs",
                width: 900,
                height: 900,
              },
              price: { amount: 90, currency: "EUR" },
            },
          ],
        },
      ],
    };
