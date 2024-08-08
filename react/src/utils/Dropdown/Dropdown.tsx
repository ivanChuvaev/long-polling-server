import { CSSProperties, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import classes from './Dropdown.module.scss';
import { createPortal } from 'react-dom';

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef=  useRef<HTMLDivElement>(null);

  const handlePosition = () => {
    if (!buttonRef.current || !dropdownRef.current) {
      return;
    }

    const buttonBoundingBox = buttonRef.current.getBoundingClientRect();
    dropdownRef.current.style.left = `${buttonBoundingBox.x + buttonBoundingBox.width / 2}px`;
    dropdownRef.current.style.top = `${buttonBoundingBox.y + buttonBoundingBox.height}px`;
  }

  const handleOpen = () => {
    setIsOpen(true);
    handlePosition();
  }

  // handle close
  useEffect(() => {
    if (isOpen) {
      const handleClick = (e: MouseEvent) => {
        let element = e.target as HTMLElement | null;
        while (element) {
          if (element === dropdownRef.current) {
            return; // element is child of or is dropdown
          }
          element = element.parentElement;
        }
        setIsOpen(false);
      }
      setTimeout(() => {
        document.addEventListener('click', handleClick);
      })
      return () => {
        setTimeout(() => {
          document.removeEventListener('click', handleClick);
        })
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      let animationFrameId: number;
      let keepLoop = true;
      let previousTime = 0;
      const handleFrame = (time: number) => {
        const elapsed = time - previousTime;
        if (keepLoop) {
          if (elapsed > 100) {
            handlePosition();
            previousTime = time;
          }
          animationFrameId = window.requestAnimationFrame(handleFrame); 
        }
      }
      animationFrameId = window.requestAnimationFrame(handleFrame)
      return () => {
        keepLoop = false;
        window.cancelAnimationFrame(animationFrameId);
      }
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={buttonRef}
        className={cn(classes['Dropdown-area'], isOpen && classes['Dropdown-area--open'])}
        onClick={handleOpen}
      >
        dropdown area
      </button>
      {createPortal(
        <div
          ref={dropdownRef}
          style={{
            '--area-width': buttonRef.current?.clientWidth,
            '--area-height': buttonRef.current?.clientHeight,
          } as CSSProperties}
          className={cn(
            classes['Dropdown-modal'],
            isOpen && classes['Dropdown-modal--open']
          )}
        >
          <div className={classes['Dropdown-modal__body']}>
            body
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
