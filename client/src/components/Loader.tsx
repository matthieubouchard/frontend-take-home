import { Portal, Spinner, Theme } from "@radix-ui/themes";

const Loader = ({ loading = false }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <Portal>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Theme>
          <Spinner
            style={{
              height: "3rem",
              width: "3rem",
            }}
          >
            Loading...
          </Spinner>
        </Theme>
      </div>
    </Portal>
  );
};

export default Loader;
